export default function openFilePicker({
  multiple = false,
  accept = [],
}: {
  multiple?: boolean;
  accept: string[];
}) {
  const fileExtenstions = accept.map((fileExt) =>
    fileExt.startsWith('.') ? fileExt : `.${fileExt}`
  );

  return new Promise<File[]>((resolve /* , reject */) => {
    const fileInput = document.createElement('input');

    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('multiple', String(multiple));
    fileInput.setAttribute('accept', fileExtenstions.join(', '));

    fileInput.addEventListener('change', (ev) => {
      const fileList: FileList = (ev as any).target.files;
      resolve(Array.from(fileList));
    });

    fileInput.click();
  });
}
