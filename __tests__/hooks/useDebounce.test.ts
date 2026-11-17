import { act, renderHook } from '@testing-library/react-native';
import { useDebounce } from '../../src/hooks/useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('actualiza el valor solo después del delay configurado', () => {
    const { result, rerender } = renderHook<string, { value: string }>(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'p' } },
    );

    rerender({ value: 'phone' });

    act(() => {
      jest.advanceTimersByTime(299);
    });
    expect(result.current).toBe('p');

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe('phone');
  });

  it('cancela el temporizador anterior cuando el valor cambia de nuevo', () => {
    const { result, rerender } = renderHook<string, { value: string }>(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'p' } },
    );

    rerender({ value: 'ph' });
    act(() => {
      jest.advanceTimersByTime(200);
    });
    rerender({ value: 'phone' });

    act(() => {
      jest.advanceTimersByTime(299);
    });
    expect(result.current).toBe('p');

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe('phone');
  });
});
