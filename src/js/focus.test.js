const blockedSites = ['facebook.com', 'youtube.com'];

function isBlocked(url) {
    return blockedSites.some(site => url.includes(site));
}

test('Bloquear site facebook.com', () => {
    expect(isBlocked('https://www.facebook.com')).toBe(true);
});

test('Não bloquear site google.com', () => {
    expect(isBlocked('https://www.google.com')).toBe(false);
});
