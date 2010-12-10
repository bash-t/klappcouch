function(doc) {
  if (doc.createdAt) {
    emit([Date.parse(doc.createdAt).getTime(), doc.bookmark.title], doc.bookmark.weburi);
  }
};