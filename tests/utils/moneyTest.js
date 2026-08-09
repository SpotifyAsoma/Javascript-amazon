import {formatCurency} from '../../scripts/utils/money.js';

describe('test Suite: formatCurrency', () => {
  it('Converts Cents Into Dollars', () => {
    expect(formatCurency(2095)).toEqual('20.95');
  });

  it('works with zero', () => {
    expect(formatCurency(0)).toEqual('0.00');
  });

  it('rounds up correctl:y 2000.5 = 20.01', () =>{
    expect(formatCurency(2000.5)).toEqual('20.01');
  });

  it('rounds down correctly: 2000.4 = 20.00', () => {
    expect(formatCurency(2000.4)).toEqual('20.00');
  });

  it('works with negative numbers: -2095 = -20.95', () => {
    expect(formatCurency(-2095)).toEqual('-20.95');
  });
});
