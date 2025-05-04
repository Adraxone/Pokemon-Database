import Link from "next/link";

// Also, why does the assignment want getStaticProps and getStaticPaths if we're using React 19, wouldn't we want to use App Router?

export async function generateStaticParams() {
    const ids = Array.from({ length: 151 }, (_, i) => ({ id: `${i + 1}` }));
    return ids;
}

export default async function MonsterPage({ params }) {
    console.log("I contacted the API"); // Why is there only like 250 generated html files even though there's 1024 pokemon?

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);

    if (!res.ok) {
        return (
            <div>
                <h1>Error loading monster #{params.id}</h1>
            </div>
        );
    }

    const data = await res.json();

    return (
        <main>
            <p style={{marginBottom: '2rem'}}>
                <Link href="/">Back to Home</Link>
            </p>
            <h1>{data.name.toUpperCase()} (#{data.id})</h1>
            <img
                src={data.sprites.front_default}
                alt={data.name}
                width={250}
                height={250}
            />
            <h2>Types:</h2>
            <ul>
                {data.types.map((entry, idx) => (
                    <li key={idx}>{entry.type.name}</li>
                ))}
            </ul>
            <h2><br/>Abilities:</h2>
            <ul>
                {data.abilities.map((entry, idx) => (
                    <li key={idx}>
                        {entry.ability.name}
                        {entry.is_hidden && " (hidden)"}
                    </li>
                ))}
            </ul>
            <h2><br/>Stats:</h2>
            <ul>
                {data.stats.map((entry, idx) => (
                    <li key={idx}>
                        {entry.stat.name}: {entry.base_stat}
                    </li>
                ))}
            </ul>
            <h2><br/>Cries:</h2>
            <ul>
                {data.cries && (
                    <>
                        <ul>
                            {data.cries.latest && (
                                <li>
                                    Latest:<br/>
                                    <audio controls src={data.cries.latest} />
                                </li>
                            )}
                            {data.cries.legacy && (
                                <li>
                                    Legacy:<br/>
                                    <audio controls src={data.cries.legacy} />
                                </li>
                            )}
                        </ul>
                    </>
                )}
            </ul>
            <h2><br/>Moves:</h2>
            <details style={{padding: '1rem'}}>
                <summary style={{ cursor: 'pointer' }}>
                    Show all {data.moves.length} moves
                </summary>
                <ul>
                    {data.moves.map((entry, idx) => (
                        <li key={idx}>
                            {entry.move.name}
                            {entry.version_group_details[0].move_learn_method.name === "egg" && " (egg)"}
                        </li>
                    ))}
                </ul>
            </details>
            <p style={{marginTop: '2rem'}}>
                <Link href="/">Back to Home</Link>
            </p>
        </main>
    );
}
