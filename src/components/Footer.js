const currYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="mt-auto w-full bg-gray-900 text-white px-4 py-4">
      <p className="text-center text-sm flex items-center justify-center gap-1">
        <span>Copyright &copy; {currYear}, Made with</span>
        <span aria-hidden>💗</span>
        <span>
          by <strong>Jassu</strong>
        </span>
      </p>
    </footer>
  );
};

export default Footer;
