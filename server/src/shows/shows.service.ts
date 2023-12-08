import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Shows } from "@prisma/client";

@Injectable()
export class ShowsService {
  constructor(private prisma: PrismaService) {}

  async getAllShows(): Promise<Shows[]> {
    const shows = await this.prisma.shows.findMany();
    return shows;
  }

  async addShow(
    params: {
      title: string;
      originalTitle: string;
      showId: number;
      posterPath: string;
      voteAverage: number;
      releaseDate: string;
      overview: string;
      mediaType: string;
    },
    userId: number,
  ): Promise<Shows> {
    const {
      title,
      originalTitle,
      showId,
      posterPath,
      voteAverage,
      releaseDate,
      overview,
      mediaType,
    } = params;

    const show = await this.prisma.shows.findUnique({
      where: { showId: showId },
    });

    if (show) {
      return await this.prisma.shows.update({
        where: { showId: showId },
        data: {
          isAdded: !show.isAdded,
        },
      });
    } else {
      return await this.prisma.shows.create({
        data: {
          isAdded: true,
          title: title,
          originalTitle: originalTitle,
          showId: showId,
          posterPath: posterPath,
          voteAverage: voteAverage,
          releaseDate: releaseDate,
          overview: overview,
          mediaType: mediaType,
          userId: userId,
        },
      });
    }
  }

  async watchedShow(
    params: {
      title: string;
      originalTitle: string;
      showId: number;
      posterPath: string;
      voteAverage: number;
      releaseDate: string;
      overview: string;
      mediaType: string;
    },
    userId: number,
  ): Promise<Shows> {
    const {
      title,
      originalTitle,
      showId,
      posterPath,
      voteAverage,
      releaseDate,
      overview,
      mediaType,
    } = params;
    const show = await this.prisma.shows.findUnique({
      where: { showId: showId },
    });

    if (show) {
      return await this.prisma.shows.update({
        where: { showId: showId },
        data: {
          isWatched: !show.isWatched,
        },
      });
    } else {
      return await this.prisma.shows.create({
        data: {
          isWatched: true,
          title: title,
          originalTitle: originalTitle,
          showId: showId,
          posterPath: posterPath,
          voteAverage: voteAverage,
          releaseDate: releaseDate,
          overview: overview,
          mediaType: mediaType,
          userId: userId,
        },
      });
    }
  }
}
