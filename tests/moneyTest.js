import {formatCurency} from '../scripts/utils/money.js';

if (formatCurency(2095) === '20.95') {
  console.log('formatCurency Passed');

} else {
  console.log('formatCurency Failed');
}

if (formatCurency(0) === '0.00') {
  console.log('string 0 Passed');
} else {
  console.log('string 0 Failed');
}

if (formatCurency(2000.5)==='20.01') {
  console.log('string 2000.5 Passed');
} else {
  console.log('string 2000.5 Failed');
}

if (formatCurency(2000.4)==='20.00') {
  console.log('string 2000.4 Passed');
} else {
  console.log('string 2000.4 Failed');
}