const sum_to_n_a = function (n) {
  // my first solution using formula
  return (n * (n + 1)) / 2;
};
const sum_to_n_b = function (n) {
  // my second solution using recursive
  if (n === 1) return 1;
  return n + sum_to_n_a(n - 1);
};

const sum_to_n_c = function (n) {
  // My final solution using a loop
  let result = 0;
  for (let i = 1; i <= n; i++) {
    result += i;
  }
  return result;
};
