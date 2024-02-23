import { isRouteErrorResponse, useLocation, useRouteError } from '@remix-run/react';

export function ErrorBoundary() {
  const error = useRouteError();
  const location = useLocation();

  // Log the error to the console
  console.error(error);

  if (isRouteErrorResponse(error)) {
    const title = `${error.status} ${error.statusText}`;
    let message;
    switch (error.status) {
      case 401:
        message = 'Oops! Looks like you tried to visit a page that you do not have access to.';
        break;
      case 404:
        message = `Oops! Looks like you tried to visit page: ${location.pathname} that does not exist.`;
        break;
      default:
        message = JSON.stringify(error.data, null, 2);
        break;
    }

    return (
      <div className="container prose flex h-screen min-w-full items-center justify-center">
        <div>
          <h1>{title}</h1>
          <p>{message}</p>
        </div>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className="container prose flex h-screen min-w-full items-center justify-center">
        <div>
          <h1>Error</h1>
          <p>{error.message}</p>
          <p>The stack trace is:</p>
          <pre>{error.stack}</pre>
        </div>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
