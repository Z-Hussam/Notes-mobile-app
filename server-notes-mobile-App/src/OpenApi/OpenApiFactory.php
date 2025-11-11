<?php 
namespace App\OpenApi;

use ApiPlatform\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\OpenApi\OpenApi;
use ArrayObject;

class OpenApiFactory implements OpenApiFactoryInterface{
   
    public function __construct(private OpenApiFactoryInterface $openApi)
    {}

    public function __invoke(array $context = []): OpenApi
    {
        $openApi = $this->openApi->__invoke($context);
        $shemas = $openApi->getComponents()->getSecuritySchemes()??[];
        $shemas['jwt'] = new ArrayObject([
            'type'=>'http',
            'schem'=>'bearer',
            'bearerFormat'=>'JWT'
        ]);
        return $openApi;
    }
}