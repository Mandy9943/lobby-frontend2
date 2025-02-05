import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import Image from "next/image";

const Login = () => {
  const { login, logout, user } = useAuth();

  return (
    <>
      {!user ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-lg bg-white hover:bg-gray-50 text-gray-700 font-medium shadow-md transition-colors duration-200 flex items-center space-x-2 border border-gray-200"
          onClick={login}
        >
          <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
          <span>Sign in with Google</span>
        </motion.button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium shadow-md transition-colors duration-200"
          onClick={logout}
        >
          Sign out
        </motion.button>
      )}
    </>
  );
};

export default Login;
