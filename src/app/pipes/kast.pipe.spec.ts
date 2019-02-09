import { KastPipe } from './kast.pipe';

describe('KastPipe', () => {
  it('create an instance', () => {
    const pipe = new KastPipe();
    expect(pipe).toBeTruthy();
  });

  it('should have kast filled when Kleedkamer 4A', () => {
    const pipe = new KastPipe();
    expect(pipe.transform('Kleedkamer 4A')).toBe('A');
  });
});
