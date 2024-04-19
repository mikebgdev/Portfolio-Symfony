<?php
/*
 * This class is part of a software application developed by Michael Ballester Granero.
 *
 * The application is distributed under the terms of the MIT License.
 * For more information, please see the LICENSE file included in the source code.
 */

declare(strict_types=1);

namespace App\Tests\Entity;

use App\Entity\Contact;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Validator\Validation;

#[covers(Contact::class)]
class ContactTest extends TestCase
{
    public function testValidContact(): void
    {
        $validator = Validation::createValidatorBuilder()
            ->enableAttributeMapping()
            ->getValidator();

        $contact = new Contact(
            'John Doe',
            'john@example.com',
            'Test Subject',
            'Test Message'
        );

        $violations = $validator->validate($contact);

        self::assertCount(0, $violations);
    }
}
