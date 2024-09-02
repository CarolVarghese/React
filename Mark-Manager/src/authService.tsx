const fakeUsers = [
  { id: 1, username: 'user1', password: 'password1', name: 'User One' },
  { id: 2, username: 'user2', password: 'password2', name: 'User Two' },
];

const login = (username: string, password: string) => {
  const user = fakeUsers.find(u => u.username === username && u.password === password);
  if (user) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return user;
  } else {
    throw new Error('Invalid username or password');
  }
};

const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

const generateAccessToken = (user: { id: number, username: string, name: string }) => {
  return `Bearer ${Buffer.from(JSON.stringify(user)).toString('base64')}`;
};

const generateRefreshToken = () => {
  return Math.random().toString(36).substring(7);
};

const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export { login, logout, getAccessToken };
