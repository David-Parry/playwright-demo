import reportWebVitals from './reportWebVitals';

jest.mock('web-vitals', () => ({
  getCLS: jest.fn(),
  getFID: jest.fn(), 
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn()
}));

describe('reportWebVitals', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('testInvalidCallbackType', async () => {
    // Test with non-function values
    const nonFunctionValues = [null, undefined, 42, 'string', {}, []];
    
    for (const invalidCallback of nonFunctionValues) {
      reportWebVitals(invalidCallback);
      
      // Verify web-vitals functions were not called
      const webVitals = await import('web-vitals');
      expect(webVitals.getCLS).not.toHaveBeenCalled();
      expect(webVitals.getFID).not.toHaveBeenCalled(); 
      expect(webVitals.getFCP).not.toHaveBeenCalled();
      expect(webVitals.getLCP).not.toHaveBeenCalled();
      expect(webVitals.getTTFB).not.toHaveBeenCalled();
    }
  });
});