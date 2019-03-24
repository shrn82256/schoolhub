const rp = require("promise-request-retry");
const $ = require("cheerio");

const { School } = require("./models/schema");

let range = n => [...Array(n).keys()];

const BASE_URL = "https://schoolconnects.in/schools/Chennai?page=";
// const TOTAL_PAGES = 22;
const TOTAL_PAGES = 2;

range(TOTAL_PAGES).forEach(async pgno => {
  const k = await rp(BASE_URL + pgno)
    .then(html => {
      $("div.shcool-list-block", html).each(function(i, elem) {
        var schoolData = {};

        schoolData.id = $(this)
          .find("h2.tuple-clg-heading a:nth-child(2)")
          .attr("href")
          .substring(1);

        schoolData.name = $(this)
          .find("h2.tuple-clg-heading a:nth-child(2)")
          .text()
          .trim();

        schoolData.thumb = $(this)
          .find("div.img-block img.photos")
          .attr("src");

        schoolData.board = $(this)
          .find("div.board li:nth-child(1)")
          .text()
          .trim();

        schoolData.medium = $(this)
          .find("div.board li:nth-child(2)")
          .text()
          .trim();

        schoolData.gender = $(this)
          .find("div.board li:nth-child(3)")
          .text()
          .trim();

        schoolData.facilities = $(this)
          .find("ul.facility-icons i.fc_icons h3")
          .map(function() {
            return $(this)
              .text()
              .trim();
          })
          .get();

        rp({
          uri: "https://schoolconnects.in/" + schoolData.id,
          retry: 1000000
        })
          .then(html => {
            schoolData.address = $("div.details div.block", html)
              .eq(0)
              .find("p")
              .text()
              .trim();

            schoolData.contact = $("div.details div.block", html)
              .eq(1)
              .find("p")
              .map(function() {
                return $(this)
                  .text()
                  .trim();
              })
              .get();

            schoolData.about = $(
              "div.update div.singl-update div.read-content",
              html
            )
              .text()
              .trim();

            schoolData.banner = $(
              "div.banner-image img.img-responsive",
              html
            ).attr("src");

            School.query()
              .insert(schoolData)
              .then(res => {
                console.log("inserted", schoolData.id);
              })
              .catch(err => {
                if (err.code == 23505) {
                  School.query()
                    .update(schoolData)
                    .where("id", schoolData.id)
                    .then(res => {
                      console.log("updated", schoolData.id);
                    });
                }
              });
          })
          .catch(err => {
            console.log("failed", schoolData.id);
          });
      });
    })
    .catch(console.log);
  console.log(k);
});
