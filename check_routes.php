<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$routes = app('router')->getRoutes();
foreach ($routes as $route) {
    if (strpos($route->getName(), 'admin.users') !== false) {
        echo $route->getName() . " -> " . $route->uri() . "\n";
    }
}
