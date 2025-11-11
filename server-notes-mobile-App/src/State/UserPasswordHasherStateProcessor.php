<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Entity\User;
use Symfony\Component\DependencyInjection\Attribute\AsDecorator;

/**  
 * To make this processor apply only to the User entity (so it doesn’t even run for any another Entity), 
 * we can specify it directly in our User entity like this: processor: UserPasswordHasherStateProcessor::class
 * Make sure you fully removed this line from your processor:  // #[AsDecorator('api_platform.doctrine.orm.state.persist_processor')]
 * Instead, it should be a plain service, not a decorator: in services.yame 
 * App\State\UserPasswordHasherStateProcessor:
 *  arguments:
 *        $userPasswordHasher: '@security.password_hasher'
 *       $processor: '@api_platform.doctrine.orm.state.persist_processor'
*/


// #[AsDecorator('api_platform.doctrine.orm.state.persist_processor')]
class UserPasswordHasherStateProcessor implements ProcessorInterface
{
    public function __construct
    (
        private UserPasswordHasherInterface $userPasswordHasher, 
        private ProcessorInterface $processor
    )
    {}

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): User
    {
        // Handle the state
        if ($data instanceof User && $data->getPassword()) {
            $data->setPassword($this->userPasswordHasher->hashPassword($data, $data->getPassword()));
        }
        
        return $this->processor->process($data,$operation,$uriVariables,$context);

    }
    
}
