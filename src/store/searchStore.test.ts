import { useSearchStore } from '../store/searchStore';

describe('useSearchStore', () => {
  beforeEach(() => {
    useSearchStore.setState({ query: '' });
  });

  it('должен вернуть начальное значение query как пустую строку', () => {
    const state = useSearchStore.getState();
    expect(state.query).toBe('');
  });

  it('должен обновить значение query', () => {
    useSearchStore.getState().setQuery('macbook');
    const state = useSearchStore.getState();
    expect(state.query).toBe('macbook');
  });
});
