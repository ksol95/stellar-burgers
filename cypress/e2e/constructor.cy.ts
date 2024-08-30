const expectObj = {
  bun: {
    id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  ingredient: [
    {
      id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0
    },
    {
      id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      __v: 0
    },
    {
      id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
      __v: 0
    }
  ],
  user: {
    name: 'Тестовый Пользователь'
  },
  order: {
    number: 50548,
    name: 'Краторный био-марсианский spicy люминесцентный бургер'
  }
};

describe('Тест страницы constructor', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.attr(`ingredient-${expectObj.ingredient[0].id}`).click();
    cy.attr('modal').as('modal');
    cy.attr('modal-close').as('modal-close');
    cy.attr('constructor-bun-top').as('bun-top');
    cy.attr('constructor-bun-bottom').as('bun-bottom');
    cy.attr('constructor-ingredients-list').as('ingredients-list');
  });

  describe('Открытие и закрытие модального окна с описанием ингредиента', () => {
    it('Проверка открытия модального окна ингредиента', () => {
      cy.get('@modal').should('be.visible');
      cy.attr('modal-title').contains('Детали ингредиента');
    });

    it('Проверка закрытия модального окна - close button', () => {
      cy.get('@modal-close').click();
      cy.get('@modal').should('not.exist');
    });

    it('Проверка закрытия модального окна - esc', () => {
      cy.get('body').type('{esc}');
      cy.get('@modal').should('not.exist');
    });

    it('Отображение в открытом модальном окне данных именно того ингредиента, по которому произошел клик.', () => {
      cy.attr('ingredient-image').should(
        'have.attr',
        'src',
        expectObj.ingredient[0].image_large
      );

      cy.attr('ingredient-name')
        .should('not.be.empty')
        .contains(expectObj.ingredient[0].name);

      cy.get('@modal').find('ul').as('productDesc');
      cy.checkProductDescriptions('@productDesc', expectObj.ingredient[0]);
    });
  });

  describe('Cоздания заказа', () => {
    beforeEach(() => {
      // Перехват запроса пользователя
      cy.intercept('GET', 'api/auth/user', {
        fixture: 'user.json'
      }).as('getUser');

      //Перехват запроса ингредиентов
      cy.intercept('GET', 'api/ingredients', {
        fixture: 'ingredients.json'
      }).as('getIngredients');

      cy.setCookie('accessToken', 'fakeToken');
      localStorage.setItem('refreshToken', 'fakeToken');

      cy.visit('/');

      cy.wait('@getUser');
      cy.wait('@getIngredients');
    });

    afterEach(() => {
      cy.setCookie('accessToken', '');
      localStorage.setItem('refreshToken', '');
    });

    it('Проверка налчия пользователя', () => {
      cy.contains(expectObj.user.name).should('exist');
    });

    it('Оформление заказа', () => {
      describe('Добавить в конструтор булку', () => {
        //Добавляем булку в конструктор булку, проверям счётчик
        cy.attr(`ingredient-${expectObj.bun.id}`)
          .as('firstBun')
          .find('button')
          .click();
        cy.get('@firstBun').find('.counter ').contains(2);

        cy.get('@bun-top')
          .contains(expectObj.bun.name + ' (верх)')
          .parent()
          .contains(expectObj.bun.price);

        cy.get('@bun-bottom')
          .contains(expectObj.bun.name + ' (низ)')
          .parent()
          .contains(expectObj.bun.price);

        cy.get('@ingredients-list').find('li').should('have.length', 0);
      });

      describe('Добавить в констроутор ингредиент', () => {
        // Добавляем в конструктор ингредиент и проверяем счётчик
        cy.attr(`ingredient-${expectObj.ingredient[0].id}`)
          .as('firstIngredient')
          .find('button')
          .click();
        cy.get('@firstIngredient').find('.counter ').contains(1);

        cy.get('@ingredients-list')
          .should('have.length', 1)
          .contains(expectObj.ingredient[0].name)
          .parent()
          .contains(expectObj.ingredient[0].price);
      });

      // Перехват запроса оформления заказа
      cy.intercept('POST', 'api/orders', {
        fixture: 'orders.json'
      }).as('postOrders');

      // Нажали "Оформить заказ"
      cy.attr('burger-constructor')
        .find('button')
        .contains('Оформить заказ')
        .click();

      cy.get('@modal').should('be.visible');
      //Проверка вывода номера заказа
      cy.attr('order-number').contains(expectObj.order.number);
      cy.get('@modal-close').click();
      cy.get('@modal').should('not.exist');
    });

    it('Проверка отчистки конструктора', () => {
      cy.get('@bun-top').contains('Выберите булки');
      cy.get('@ingredients-list').contains('Выберите начинку');
      cy.get('@bun-bottom').contains('Выберите булки');

      // Перехват запроса вывода ленты заказов
      cy.intercept('GET', 'api/orders/all', {
        fixture: 'feed.json'
      }).as('getFeed');

      cy.visit('/feed');
      cy.wait('@getFeed');
      //Проверка добавленого заказа в ленте заказов
      cy.attr('order-list')
        .contains('#0' + expectObj.order.number)
        .parent()
        .parent()
        .find('h4')
        .contains(expectObj.order.name);
    });
  });
});
