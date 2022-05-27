import type { NextPage } from "next";
import Head from "next/head";
import { prisma } from "../../lib/prisma";

export async function getStaticProps() {
  const fruit = await prisma.fruits.findFirst();

  return {
    props: {
      fruit: JSON.parse(JSON.stringify(fruit)),
    },
  };
}
type Props = {
  fruit: { name: string; description: string };
};
const ExampleSsg: NextPage<Props> = ({ fruit = {} }) => {
  return (
    <main className="text-3xl font-bold underline">
      <div>
        <label>name</label>
        <p>{fruit.name}</p>
        <label>descricao</label>
        <p>{fruit.description}</p>
      </div>
    </main>
  );
};

export default ExampleSsg;
