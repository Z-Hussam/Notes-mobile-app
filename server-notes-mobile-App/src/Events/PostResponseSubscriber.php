<?php 
namespace App\Events;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\Notes;
use Psr\Log\LoggerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class PostResponseSubscriber implements EventSubscriberInterface 
{
    

    // Inject the logger (or any other service you need)
    public function __construct(private LoggerInterface $logger)
    {
        
    }
    

     public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['onNotesCreated', EventPriorities::POST_WRITE],
        ];
    }


    
    public function onNoteCreated(ViewEvent $event):void
    {   
        $note = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
       
        
        // Log some debugging information to ensure the subscriber is triggered
        $this->logger->info('NotesResponseSubscriber triggered', [
            'note_id' => $note->getId(),
            'method' => $method
        ]);

        // Only modify response for POST requests and when the entity is a Note
        if (!$note instanceof Notes || $method !== 'POST') {
            return;
        }

        $data = [
            'id' => $note->getId(),
            'text' => $note->getText(), 
            'created_at' => $note->getCreatedAt()->format('Y-m-d H:i:s'),
            'custom_message' => 'Note successfully created!',
        ];

          // Log the custom data for debugging
        $this->logger->info('Custom data:', $data);

        // Set the new response with custom data
        $event->setResponse(new JsonResponse($data, JsonResponse::HTTP_CREATED));
    }
}