import { useWebWorkerFn } from '@vueuse/core'

export function withWorker() {
  const main = async () => {
    const start = Date.now();
  
    function fn () {
      function fibonacci(n) {
        return n < 1 ? 0 : n <= 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
      }
  
      const doFib = (iterations) =>
      new Promise((resolve) => {
          console.log('start do Fib');
          const start = Date.now();
          const result = fibonacci(iterations);
          console.log(`doFib done in ${Date.now() - start}ms`);
          resolve(result);
        });
  
      return doFib(40)
    }
  
    const values = await Promise.all([
      useWebWorkerFn(fn).workerFn(),
      useWebWorkerFn(fn).workerFn(),
      useWebWorkerFn(fn).workerFn(),
      useWebWorkerFn(fn).workerFn(),
      useWebWorkerFn(fn).workerFn(),
      useWebWorkerFn(fn).workerFn(),
      useWebWorkerFn(fn).workerFn(),
      useWebWorkerFn(fn).workerFn(),
      useWebWorkerFn(fn).workerFn(),
      useWebWorkerFn(fn).workerFn()
    ]);
  
    console.log('values: ', values);
    console.log(`all fib done in ${Date.now() - start}ms`);
  };
  
  return {
    do: () => main().catch(console.error)
  }
}

