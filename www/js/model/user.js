function User (email, name, imageUrl) {
  this.email = email;
  this.name = name;
  this.imageUrl = imageUrl;
  this.level = {
    number: 1,
    status: 'I know nothing...'
  };
  this.games = {
    favorites: [],
    owned: [],
    wishListed: []
  };
  this.profile = {
    rating: 5,
    sales: 0,
    bought: 0,
    qualifications: []
  };
}
