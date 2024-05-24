import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { Button, TextInput } from '@mantine/core';
import { json } from '@remix-run/cloudflare';
import { Form, useLoaderData } from '@remix-run/react';
import { resources } from '~/drizzle/schema';
import { getDb } from '~/utils/.server';

export async function loader({ context }: LoaderFunctionArgs) {
  const db = getDb(context);
  const resourceList = await db.select({ id: resources.id, title: resources.title, href: resources.href }).from(resources).orderBy(resources.id);

  return json({ resourceList });
}

export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get('title') as string;
  const href = formData.get('href') as string;

  const db = getDb(context);
  await db.insert(resources).values({ title, href }).execute();

  return json({ message: 'Resource added' }, { status: 201 });
}

export default function Index() {
  const { resourceList } = useLoaderData<typeof loader>();

  return (
    <div className="container">
      <h1 className="text-blue-500">Welcome to Remix (with Drizzle, Vite and Cloudflare D1)</h1>
      <ul>
        {resourceList.map((resource) => (
          <li key={resource.id}>
            <a target="_blank" href={resource.href} rel="noreferrer">
              {resource.title} - {resource.href}
            </a>
          </li>
        ))}
      </ul>

      <Form className="my-12 space-y-4" method="POST">
        <TextInput label="Title" name="title" />
        <TextInput label="URL" type="url" name="href" />
        <Button type="submit">Add Resource</Button>
      </Form>
    </div>
  );
}
