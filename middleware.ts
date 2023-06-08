// import {Ratelimit} from "@upstash/ratelimit";
// import {Redis} from "@upstash/redis";
import {getToken} from "next-auth/jwt";
import {withAuth} from "next-auth/middleware";
import {NextResponse} from "next/server";

// const redis = new Redis({
//   url: process.env.REDIS_URL,
//   token: process.env.REDIS_SECRET,
// });

// const ratelimit = new Ratelimit({
//   redis,
//   limiter: Ratelimit.slidingWindow(5, "1 h"),
// });

export default withAuth(
  async function middleware(req) {
    // const pathname = req.nextUrl.pathname;

    // if (pathname.startsWith("/api")) {
    //   const ip = req.ip ?? "127.0.0.1";

    //   try {
    //     const {succes} = await ratelimit.limit(ip);
    //   } catch (error) {}
    // }

    const token = await getToken({req}); // obtiene el token del request
    const isAuth = !!token; // devuelve true si existe y false si no existe o es invalido
    const isAuthPage = req.nextUrl.pathname.startsWith("/login");

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      return null;
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;

      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      // si no existe el token me redirige a /login + la ruta en la que estaba
      // si luego inicio sesion, me redirige directamente a esa ruta
      // en signin() de user-auth-form
      return NextResponse.redirect(new URL(`/login?from=${encodeURIComponent(from)}`, req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  },
);

// middleware se ejecutara en todas estas rutas
export const config = {
  matcher: ["/dashboard/:path*", "/editor/:path*", "/login"],
};
