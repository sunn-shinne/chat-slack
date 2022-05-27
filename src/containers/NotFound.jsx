import React from 'react';

const NotFound = () => (
  <div className="m-3 text-center">
    <img
      src="https://i7.uihere.com/icons/280/662/360/404-01-a905605f38e8c7b16da0fed6e0f1c638.png"
      alt="Страница не найдена"
      style={{ height: 400 }}
    />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p>
      Вы можете перейти&nbsp;
      <a href="/">на главную страницу</a>
    </p>
  </div>
);

export default NotFound;
