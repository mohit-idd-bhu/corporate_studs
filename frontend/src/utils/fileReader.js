export const fileReader = (file) => {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
          const text = e.target.result;
          resolve(text);
      };

      reader.onerror = (e) => {
          reject(e);
      };
      reader.readAsText(file);
  });
};