<?php

namespace App\Events;
// src/EventListener/JWTCreationListener.php

use DateTime;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\VarDumper\Cloner\Data;

class JWTCreationListener
{
    /**
     * Adds custom data to the JWT payload before it's encoded.
     */
    public function onJWTCreated(JWTCreatedEvent $event): void
    {
        $payload = $event->getData();

        $user = $event->getUser();

        // 🔑 Access the User object and add custom claims
        // Assuming your User entity has a 'getDepartmentId()' method
        $payload['user_id'] = $user->getId(); 
        
        // Add a timestamp for when the token was customized
        $payload['customized_at'] = new DateTime('now');

        $event->setData($payload);
    }
}