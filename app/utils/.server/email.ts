import type { ReactElement } from 'react';
import { render } from '@react-email/render';
import { z } from 'zod';
import { email, env } from '~/utils/contants';

export async function sendEmail({ react, ...options }: Props) {
  const payload = {
    from: email.from,
    ...options,
    ...(react ? renderReactEmail(react) : null),
  };

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  const parsedData = resendSuccessSchema.safeParse(data);

  if (response.ok && parsedData.success) {
    return {
      status: 'success',
      data: parsedData,
    } as const;
  } else {
    const parseResult = resendErrorSchema.safeParse(data);
    if (parseResult.success) {
      return {
        status: 'error',
        error: parseResult.data,
      } as const;
    } else {
      return {
        status: 'error',
        error: {
          name: 'UnknownError',
          message: 'Unknown Error',
          statusCode: 500,
          cause: data,
        } satisfies ResendError,
      } as const;
    }
  }
}

function renderReactEmail(react: ReactElement) {
  return { html: render(react), text: render(react, { plainText: true }) };
}

const resendErrorSchema = z.union([
  z.object({
    name: z.string(),
    message: z.string(),
    statusCode: z.number(),
  }),
  z.object({
    name: z.literal('UnknownError'),
    message: z.literal('Unknown Error'),
    statusCode: z.literal(500),
    cause: z.any(),
  }),
]);

const resendSuccessSchema = z.object({
  id: z.string(),
});

type Props = {
  to: string[];
  subject: string | unknown;
} & ({ html: string; text: string; react?: never } | { react: ReactElement; html?: never; text?: never });

type ResendError = z.infer<typeof resendErrorSchema>;
