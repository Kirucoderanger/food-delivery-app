import { createUploadthing, createRouteHandler } from "uploadthing/server";

const f = createUploadthing();

export const uploadRouter = {
  restaurantImage: f({
    image: { maxFileSize: "4MB" },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.url };
  }),
};

export const uploadHandler = createRouteHandler({
  router: uploadRouter,
});
