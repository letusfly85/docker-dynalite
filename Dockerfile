FROM node

RUN npm install -g dynalite

EXPOSE 4567

CMD ["dynalite"]
