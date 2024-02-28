<?php
/*
 * This class is part of a software application developed by Michael Ballester Granero.
 *
 * The application is distributed under the terms of the MIT License.
 * For more information, please see the LICENSE file included in the source code.
 */

namespace App\Controller;

use App\Form\ContactType;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Contracts\Translation\TranslatorInterface;

class ContactController extends AbstractController
{
    private TranslatorInterface $translator;

    public function __construct(TranslatorInterface $translator)
    {
        $this->translator = $translator;
    }

    public function contact(Request $request, MailerInterface $mailer, LoggerInterface $logger): Response
    {
        $form = $this->createForm(ContactType::class);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $contactFormData = $form->getData();

            $email = (new Email())
                ->from($this->getParameter('mail'))
                ->to($this->getParameter('mail'))
                ->subject($contactFormData->getSubject().' Email: '.$contactFormData->getEmail())
                ->text($contactFormData->getMessage());

            try {
                $mailer->send($email);
                $result = $this->translator->trans('email.sent_successfully');
            } catch (TransportExceptionInterface $e) {
                $logger->error($e);
                $result = $this->translator->trans('email.send_error');
            }

            return new JsonResponse(['result' => $result]);
        }

        return $this->redirectToRoute('index', [
            'form' => $form,
        ]);
    }
}
