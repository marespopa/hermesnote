import MainLayout from "../../components/MainLayout/MainLayout.component";

type Props = {};

const RootPage = (props: Props) => {
  return (
    <MainLayout>
      <article className="prose lg:prose-xl">
        <h1>TrackFCL</h1>
        <h2>What is the app&rsquo;s purpose?</h2>
        <p>
          Have an overview of all the freelance clients and the status of the
          project in just one look. From project deadlines and deliverables to
          proposals and invoices, it&rsquo;s all in one place.
        </p>
        <h2>What do you want to achieve by building the app?</h2>
        <p>Simplify client management for freelancing gigs</p>
        <h2>How will it engage users?</h2>
        <p>
          Easy to create PDF reports with the project status to send to the
          client
        </p>
        <h2>What will be the app&rsquo;s core features?</h2>
        <p>PDF Report creation.</p>
        <h2>Will your target audience see the app as useful?</h2>
        <p>
          It will simplify the way business works between freelancers and
          clients
        </p>
      </article>
    </MainLayout>
  );
};

export default RootPage;
