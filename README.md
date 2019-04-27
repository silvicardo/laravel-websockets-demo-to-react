# Laravel WebSockets Demo To React + Redux 🛰

React + Redux implementation of the official [Laravel WebSockets Demo](https://github.com/beyondcode/laravel-websockets-demo)


Check out the [Laravel WebSockets](https://github.com/beyondcode/laravel-websockets) package!

Also look out for the [official documentation](https://docs.beyondco.de/laravel-websockets/).

## Usage

Remember

  -> complete your .env with your db credentials
  -> Open two different browsers to test the app registering with different accounts

Notes

  -> php artisan make:auth should not be necessary

```bash
git clone https://github.com/silvicardo/laravel-websockets-demo-to-react.git
cd laravel-websockets-demo-to-react
composer install
cp .env.example .env
composer require laravel/passport
#php artisan make:auth
php artisan migrate
php artisan passport:install
npm install
npm run dev
php artisan key:generate
php artisan websockets:serve
php artisan serve
```

## Credits

- [Marcel Pociot](https://github.com/mpociot)
- [Freek Van der Herten](https://github.com/freekmurze)
- [All Contributors](../../contributors)
- [Bitfumes - Laravel WebSockets guide](https://www.youtube.com/watch?v=mDnsC-sfG7I&t=626s)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
