import Link from 'next/link';

export default function Home() {
    const pokemonList = Array.from({ length: 1024 }, (_, i) => i + 1);
    // As a note, there is really no way to list all the pocket monsters directly from the API. You can use the
    // knowledge that there is an ID param that is numeric and increments. In the current year, there are just
    // over 1000 pocket monsters available in the database.

    return (
        <main>
            <h1>Pokemon Index</h1>
            <h4>Use Control F to search</h4>
            <ul>
                {pokemonList.map((id) => (
                    <li key={id} style={{ marginBottom: '1rem', marginTop: '1rem' }}>
                        <Link href={`/monsters/${id}`}>
                            Pokemon #{id}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
