import { Wrapper } from '~/components';

export const meta = () => [{ title: '404 - FPT Software AI Center' }];
export default function NotFound() {
  return (
    <Wrapper>
      <div className="container flex h-screen items-center justify-center">
        <h1 className="text-blue-500">404</h1>
      </div>
    </Wrapper>
  );
}
