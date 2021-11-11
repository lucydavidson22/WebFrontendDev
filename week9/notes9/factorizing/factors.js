self.addEventListener('message', (event) => {

    const factors = String(factorsOf(Number(event.data)));
    self.postMessage(factors);
    self.close();

}, false);