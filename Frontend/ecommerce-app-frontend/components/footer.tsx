import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-600">
              We are passionate about delivering the best shopping experience to
              our customers.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-gray-600 hover:text-primary">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-600 hover:text-primary">
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="text-gray-600 hover:text-primary"
                >
                  My Orders
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-600">Email: support@amazingshop.com</p>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-600">
          © 2023 ShopHaven. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
