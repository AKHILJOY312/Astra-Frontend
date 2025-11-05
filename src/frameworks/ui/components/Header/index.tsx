import { useState } from "react";
import { Drawer, Row } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { SvgIcon } from "../../common/SvgIcon";
import { Button } from "../../common/Button";
import Container from "../../common/Container";

const Header = () => {
  const [visible, setVisible] = useState(false);

  const toggleDrawer = () => setVisible(!visible);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setVisible(false);
    }
  };

  const MenuItem = () => (
    <>
      <div
        onClick={() => scrollTo("about")}
        className="text-lg text-[#18216d] mx-6 my-2 cursor-pointer transition-all duration-200 hover:text-orange-500 hover:underline underline-offset-4 decoration-wavy"
      >
        About
      </div>
      <div
        onClick={() => scrollTo("mission")}
        className="text-lg text-[#18216d] mx-6 my-2 cursor-pointer transition-all duration-200 hover:text-orange-500 hover:underline underline-offset-4 decoration-wavy"
      >
        Mission
      </div>
      <div
        onClick={() => scrollTo("product")}
        className="text-lg text-[#18216d] mx-6 my-2 cursor-pointer transition-all duration-200 hover:text-orange-500 hover:underline underline-offset-4 decoration-wavy"
      >
        Product
      </div>
      <div
        onClick={() => scrollTo("contact")}
        className="mx-6 my-2 cursor-pointer"
      >
        <Button>Contact</Button>
      </div>
    </>
  );

  return (
    <header className="py-4 px-2 shadow-sm">
      <Container>
        <Row justify="space-between" align="middle">
          {/* Logo */}
          <a href="/" aria-label="homepage" className="flex items-center">
            <SvgIcon src="logo.svg" width="101px" height="64px" />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <MenuItem />
          </div>

          {/* Burger for mobile */}
          <div
            onClick={toggleDrawer}
            className="block md:hidden text-[#2e186a] cursor-pointer text-2xl"
          >
            <MenuOutlined />
          </div>
        </Row>

        {/* Drawer (mobile menu) */}
        <Drawer
          closable={false}
          open={visible}
          onClose={toggleDrawer}
          style={{ backgroundColor: "white" }}
        >
          <div
            className="flex justify-between items-center mb-8 cursor-pointer"
            onClick={toggleDrawer}
          >
            <h5 className="text-xl font-semibold">Menu</h5>
            <MenuOutlined className="text-xl" />
          </div>
          <div className="flex flex-col items-start space-y-3">
            <MenuItem />
          </div>
        </Drawer>
      </Container>
    </header>
  );
};

export default Header;
