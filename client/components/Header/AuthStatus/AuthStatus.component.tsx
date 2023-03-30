import { useRouter } from "next/router";
import styles from "./AuthStatus.module.scss";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "@/components/Forms/Button";

const AuthStatus = () => {
  const router = useRouter();

  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  function goToSignIn() {
    router.push(`/api/auth/signin`);
  }

  return (
    <div className={styles.signedInStatus}>
      <div
        className={`nojs-show ${
          !session && isLoading ? styles.loading : styles.loaded
        }`}
      >
        {!session && (
          <>
            <span className={styles.notSignedInText}>
              You are not signed in
            </span>
            <div className={styles.headerBtn}>
              <Button handleClick={() => goToSignIn()} label="Sign In"></Button>
            </div>
          </>
        )}
        {session?.user && (
          <>
            {session.user.image && (
              <span
                style={{ backgroundImage: `url('${session.user.image}')` }}
                className={styles.avatar}
              />
            )}
            <span className={styles.signedInText}>
              <small>Signed in as</small>
              <br />
              <strong>{session.user.email ?? session.user.name}</strong>
            </span>
            <div className={styles.headerBtn}>
              <Button handleClick={() => signOut()} label="Sign out"></Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthStatus;
