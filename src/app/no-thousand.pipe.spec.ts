import { NoThousandPipe } from './no-thousand.pipe';

describe('NoThousandPipe', () => {
  it('create an instance', () => {
    const pipe = new NoThousandPipe();
    expect(pipe).toBeTruthy();
  });
});
