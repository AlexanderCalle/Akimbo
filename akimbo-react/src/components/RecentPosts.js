import React from "react";

const RecentPosts = () => {
  return (
    <div className="flex flex-col gap-2 my-4">
      <h2 className="text-2xl font-medium underline">Recent Posts</h2>
      <div className="flex flex-col gap-2">
        <section className="w-full h-80 flex items-center justify-center">
          <article className="w-3/6 h-4/5 flex flex-col p-2 -mr-14 z-10 items-end gap-2 bg-akimbo-light bg-opacity-80 backdrop-blur-sm">
            <h3 className="text-lg font-medium">Article title</h3>
            <p className=" w-full overflow-hidden text-ellipsis text-end">
              orem ipsum dolor sit amet, consectetur adipiscing elit. Nam id
              orci sit amet turpis fringilla vehicula sit amet a tortor. Nunc
              vestibulum risus vitae sem pretium, at porta nisl eleifend. Sed
              non pharetra elit, in tincidunt tortor. Maecenas blandit ultrices
              lorem, ac ullamcorper ligula vulputate in. Pellentesque habitant
              morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Sed sed risus orci. Aenean id gravida tellus, ut
              hendrerit ligula. Donec non consectetur magna. Suspendisse porta
              augue in auctor luctus. Aliquam luctus, erat nec scelerisque
              consectetur, quam sapien sodales magna, nec interdum lectus orci
              et turpis. Ut a augue eu dui posuere consectetur at a erat.
              Quisque blandit lectus quam, fringilla laoreet est porttitor et.
              Sed id varius magna. Integer eleifend purus nec quam molestie
            </p>
            <button className="bg-akimbo-dark-900 px-3 py-2 text-akimbo-light rounded">
              See more
            </button>
          </article>
          <div className="w-2/6 h-full border border-solid"></div>
        </section>
        <section className="w-full h-80 flex flex-row-reverse items-center justify-center">
          <article className="w-3/6 h-4/5 flex flex-col p-2 -ml-14 z-10 items-start gap-2 bg-akimbo-light bg-opacity-80 backdrop-blur-sm">
            <h3 className="text-lg font-medium">Article title</h3>
            <p className=" w-full overflow-hidden text-ellipsis text-start">
              orem ipsum dolor sit amet, consectetur adipiscing elit. Nam id
              orci sit amet turpis fringilla vehicula sit amet a tortor. Nunc
              vestibulum risus vitae sem pretium, at porta nisl eleifend. Sed
              non pharetra elit, in tincidunt tortor. Maecenas blandit ultrices
              lorem, ac ullamcorper ligula vulputate in. Pellentesque habitant
              morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Sed sed risus orci. Aenean id gravida tellus, ut
              hendrerit ligula. Donec non consectetur magna. Suspendisse porta
              augue in auctor luctus. Aliquam luctus, erat nec scelerisque
              consectetur, quam sapien sodales magna, nec interdum lectus orci
              et turpis. Ut a augue eu dui posuere consectetur at a erat.
              Quisque blandit lectus quam, fringilla laoreet est porttitor et.
              Sed id varius magna. Integer eleifend purus nec quam molestie
            </p>
            <button className="bg-akimbo-dark-900 px-3 py-2 text-akimbo-light rounded">
              See more
            </button>
          </article>
          <div className="w-2/6 h-full border border-solid"></div>
        </section>
        <section className="w-full h-80 flex items-center justify-center">
          <article className="w-3/6 h-4/5 flex flex-col p-2 -mr-14 z-10 items-end gap-2 bg-akimbo-light bg-opacity-80 backdrop-blur-sm">
            <h3 className="text-lg font-medium">Article title</h3>
            <p className=" w-full overflow-hidden text-ellipsis text-end">
              orem ipsum dolor sit amet, consectetur adipiscing elit. Nam id
              orci sit amet turpis fringilla vehicula sit amet a tortor. Nunc
              vestibulum risus vitae sem pretium, at porta nisl eleifend. Sed
              non pharetra elit, in tincidunt tortor. Maecenas blandit ultrices
              lorem, ac ullamcorper ligula vulputate in. Pellentesque habitant
              morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Sed sed risus orci. Aenean id gravida tellus, ut
              hendrerit ligula. Donec non consectetur magna. Suspendisse porta
              augue in auctor luctus. Aliquam luctus, erat nec scelerisque
              consectetur, quam sapien sodales magna, nec interdum lectus orci
              et turpis. Ut a augue eu dui posuere consectetur at a erat.
              Quisque blandit lectus quam, fringilla laoreet est porttitor et.
              Sed id varius magna. Integer eleifend purus nec quam molestie
            </p>
            <button className="bg-akimbo-dark-900 px-3 py-2 text-akimbo-light rounded">
              See more
            </button>
          </article>
          <div className="w-2/6 h-full border border-solid"></div>
        </section>
      </div>
    </div>
  );
};

export default RecentPosts;
