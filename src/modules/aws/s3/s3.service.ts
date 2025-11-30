import { Injectable } from "@nestjs/common";
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from "@nestjs/config";
import { Readable } from 'stream';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Upload } from "@aws-sdk/lib-storage";

@Injectable()
export class S3Service {
  private client: S3Client
  constructor(configService: ConfigService) {
    this.client = new S3Client({
      region: configService.get<string>("AWS_REGION")!,
      credentials: {
        accessKeyId: configService.get<string>("AWS_ACCESS_KEY")!,
        secretAccessKey: configService.get<string>("AWS_SECRET_KEY")!,
      },
    });
  }

  async uploadStream(bucket: string, key: string, stream: Readable, mimetype: string) {
    const upload = new Upload({
      client: this.client,
      params: {
        Bucket: bucket,
        Key: key,
        Body: stream,
        ContentType: mimetype
      },
    });

    const result = await upload.done();
    return result;
  }

  async getFileUrl(bucket: string, key: string, expiresIn: number) {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    return getSignedUrl(this.client, command, { expiresIn: expiresIn || 3600 });
  }
}