let movies;    // List of movies from TMDB

// Utility functions
const filterByTitle = (movieList, string) =>
  movieList.filter((m) => m.title.toLowerCase().search(string) !== -1);

const filterByGenre = (movieList, genreId) =>
  movieList.filter((m) => m.genre_ids.includes(genreId));

const filterByGenreAndTitle = (movieList, genreId, string) =>
  movieList.filter((m) => m.genre_ids.includes(genreId) && m.title.toLowerCase().search(string) !== -1);

describe("Home Page ", () => {
  before(() => {
    // Get movies from TMDB and store in movies variable.
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")    // Take the body of HTTP response from TMDB
      .then((response) => {
        movies = response.results
      })
  })
  beforeEach(() => {
    cy.visit("/")
  });

  describe("Base tests", () => {
    it("displays page header", () => {
        cy.get("h3").contains("Discover Movies");
        cy.get("h1").contains("Filter the movies");
      });
  });

  describe("Filtering", () => {
    describe("By movie title", () => {
        it("should only display movies with m in the title", () => {
          let searchString = "m";
          let matchingMovies = filterByTitle(movies, searchString);
          cy.get("#filled-search").clear().type(searchString); // Enter m in text box
          cy.get(".MuiCardHeader-content").should(
            "have.length",
            matchingMovies.length
          );
          cy.get(".MuiCardHeader-content").each(($card, index) => {
            cy.wrap($card).find("p").contains(matchingMovies[index].title);
          });
        })
        it("should only display movies with o in the title", () => {
          let searchString = "o";
          let matchingMovies = filterByTitle(movies, searchString);
          cy.get("#filled-search").clear().type(searchString); // Enter m in text box
          cy.get(".MuiCardHeader-content").should(
            "have.length",
            matchingMovies.length
          );
          cy.get(".MuiCardHeader-content").each(($card, index) => {
            cy.wrap($card).find("p").contains(matchingMovies[index].title);
          });
        });
      it("should only display movies with xyz in the title", () => {
        let searchString = "xyz";
        let matchingMovies = filterByTitle(movies, searchString);
        cy.get("#filled-search").clear().type(searchString); // Enter m in text box
        cy.get(".MuiCardHeader-content").should(
          "have.length",
          matchingMovies.length
        );
      });
    })
  });

  describe("By movie genre", () => {
    it("should display movies with the specified genre only", () => {
       const selectedGenreId = 35;
       const selectedGenreText = "Comedy";
       const matchingMovies = filterByGenre(movies, selectedGenreId);
       cy.get("#genre-select").click();
       cy.get("li").contains(selectedGenreText).click();
       cy.get(".MuiCardHeader-content").should(
         "have.length",
         matchingMovies.length
       );
       cy.get(".MuiCardHeader-content").each(($card, index) => {
         cy.wrap($card).find("p").contains(matchingMovies[index].title);
       });
     });
   });

   describe("By Title and Movie genre", () => {
    it("should display movies with the specified genre and title only", () => {
     const searchString = "o";
     const genreId = 35;
     const genreText = "Comedy";
     const matchingMovies = filterByGenreAndTitle(movies, genreId, searchString);

     cy.get("#filled-search").clear().type(searchString);
     cy.get("#genre-select").click();
     cy.get("li").contains(genreText).click();

     cy.get(".MuiCardHeader-content").should(
        "have.length",
        matchingMovies.length
      );
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(matchingMovies[index].title);
      });
    });
   });
   describe("If Heart Icon is shown", () => {
    it("should check if a heart shows after movie is added to your favourites", () => {
      cy.get('button[aria-label="add to favorites"]').eq(0).click();
      cy.get('.makeStyles-avatar-10').eq(0);
      cy.get('.MuiButton-colorInherit').eq(1).click();
    });
   });


});