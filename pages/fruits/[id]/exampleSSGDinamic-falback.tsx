import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { prisma } from "../../../lib/prisma";
import { useRouter } from "next/router";

type StaticProps = {
  fruit: { name: string; description: string };
};

type StaticParams = {
  id: string;
};

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  const resources = await prisma.fruits.findMany({
    select: { id: true },
  });

  return {
    paths: resources.map((fruit) => ({ params: { id: fruit.id } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<
  StaticProps,
  StaticParams
> = async ({ params }) => {
  const fruit = await prisma.fruits.findUnique({
    where: { id: params?.id },
  });

  return {
    props: {
      fruit: JSON.parse(JSON.stringify(fruit)),
    },
  };
};

type Props = {
  fruit: { name: string; description: string };
};
const ExampleSsgDinamicFalback: NextPage<Props> = ({ fruit = null }) => {
  const router = useRouter();

  if (router.isFallback || !fruit) {
    return <span>Loading...</span>;
  }
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

export default ExampleSsgDinamicFalback;
