const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-500 text-center py-2 text-xs mb-[60px] md:mb-0">
      © {new Date().getFullYear()} BookHunt. All rights reserved.
    </footer>
  );
};

export default Footer;
