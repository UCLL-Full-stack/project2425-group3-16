import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import styles from '@styles/home.module.css';

const Home: React.FC = () => {
    return (
        <>
            <Head>
                <title>RecipeShare</title>
                <meta name="description" content="Courses app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className={styles.main}>
                <span>
                    <Image
                        src="/images/recipes.png"
                        alt="Courses Logo"
                        className={styles.vercelLogo}
                        width={50}
                        height={50}
                    />
                    <h1>Welcome!</h1>
                </span>

                <div className={styles.description}>
                    <p>
                        RecipeShare lets you discover and share recipes with a community of food enthusiasts. <br />
                        As a user, you can browse, save, and share your favorite recipes. <br />
                        You can also see detailed instructions, ingredients, and user reviews for each recipe.
                    </p>
                </div>
                <h2>Credentials</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>User</td>
                            <td>user</td>
                        </tr>
                        <tr>
                            <td>Chef</td>
                            <td>chef</td>
                        </tr>
                        <tr>
                            <td>Admin</td>
                            <td>admin</td>
                        </tr>
                    </tbody>
                </table>
            </main>
        </>
    )
}

export default Home