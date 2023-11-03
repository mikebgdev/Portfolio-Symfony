<?php
/*
 * This class is part of a software application developed by Michael Ballester Granero.
 *
 * The application is distributed under the terms of the MIT License.
 * For more information, please see the LICENSE file included in the source code.
 */

namespace App\Controller;

use App\Form\ContactType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class MainController extends AbstractController
{
    public function index(Request $request): Response
    {
        $form = $this->createForm(
            ContactType::class,
            null,
            ['action' => $this->generateUrl('contact')]
        );

        $form->handleRequest($request);

        return $this->render(
            'base.html.twig',
            [
                'form' => $form->createView(),
            ]
        );
    }
}
