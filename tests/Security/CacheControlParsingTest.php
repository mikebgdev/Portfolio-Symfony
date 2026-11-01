<?php

/*
 * This class is part of a software application developed by Michael Ballester Granero.
 *
 * The application is distributed under the terms of the MIT License.
 * For more information, please see the LICENSE file included in the source code.
 */

declare(strict_types=1);

namespace App\Tests\Security;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;

final class CacheControlParsingTest extends TestCase
{
    #[DataProvider('whitespaceHeaders')]
    public function testRequestParsesCacheControlWithoutBacktrackingFailure(string $header): void
    {
        $previousLimit = \ini_set('pcre.backtrack_limit', '10000');
        try {
            $request = Request::create('/', 'GET', [], [], [], ['HTTP_CACHE_CONTROL' => $header]);
            self::assertTrue($request->headers->hasCacheControlDirective('private'));
            self::assertSame('60', $request->headers->getCacheControlDirective('max-age'));
            self::assertSame(\PREG_NO_ERROR, \preg_last_error());
        } finally {
            \ini_set('pcre.backtrack_limit', (string) $previousLimit);
        }
    }

    public static function whitespaceHeaders(): iterable
    {
        yield 'spaces before comma' => ['private'.\str_repeat(' ', 32).', max-age=60'];
        yield 'tabs before comma' => ['private'.\str_repeat("\t", 32).', max-age=60'];
        yield 'ordinary cache control' => ['private, max-age=60'];
    }
}
