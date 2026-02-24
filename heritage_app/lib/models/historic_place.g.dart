// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'historic_place.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class HistoricPlaceAdapter extends TypeAdapter<HistoricPlace> {
  @override
  final int typeId = 0;

  @override
  HistoricPlace read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return HistoricPlace(
      id: fields[0] as String,
      nameEn: fields[1] as String,
      nameNe: fields[2] as String,
      descriptionEn: fields[3] as String,
      descriptionNe: fields[4] as String,
      latitude: fields[5] as double,
      longitude: fields[6] as double,
      category: fields[7] as String,
      photoUrls: (fields[8] as List).cast<String>(),
      videoUrl: fields[9] as String?,
      audioUrl: fields[10] as String?,
      openingHours: fields[11] as String?,
      entryFee: fields[12] as String?,
      rating: fields[13] as double,
      reviewCount: fields[14] as int,
      historicalPeriod: fields[15] as String?,
      howToReachEn: fields[16] as String?,
      howToReachNe: fields[17] as String?,
      bestTimeToVisit: fields[18] as String?,
      nearbyPlaceIds: (fields[19] as List).cast<String>(),
      isFeatured: fields[20] as bool,
      thumbnailUrl: fields[21] as String?,
      address: fields[22] as String,
      city: fields[23] as String,
      province: fields[24] as String,
    );
  }

  @override
  void write(BinaryWriter writer, HistoricPlace obj) {
    writer
      ..writeByte(25)
      ..writeByte(0)
      ..write(obj.id)
      ..writeByte(1)
      ..write(obj.nameEn)
      ..writeByte(2)
      ..write(obj.nameNe)
      ..writeByte(3)
      ..write(obj.descriptionEn)
      ..writeByte(4)
      ..write(obj.descriptionNe)
      ..writeByte(5)
      ..write(obj.latitude)
      ..writeByte(6)
      ..write(obj.longitude)
      ..writeByte(7)
      ..write(obj.category)
      ..writeByte(8)
      ..write(obj.photoUrls)
      ..writeByte(9)
      ..write(obj.videoUrl)
      ..writeByte(10)
      ..write(obj.audioUrl)
      ..writeByte(11)
      ..write(obj.openingHours)
      ..writeByte(12)
      ..write(obj.entryFee)
      ..writeByte(13)
      ..write(obj.rating)
      ..writeByte(14)
      ..write(obj.reviewCount)
      ..writeByte(15)
      ..write(obj.historicalPeriod)
      ..writeByte(16)
      ..write(obj.howToReachEn)
      ..writeByte(17)
      ..write(obj.howToReachNe)
      ..writeByte(18)
      ..write(obj.bestTimeToVisit)
      ..writeByte(19)
      ..write(obj.nearbyPlaceIds)
      ..writeByte(20)
      ..write(obj.isFeatured)
      ..writeByte(21)
      ..write(obj.thumbnailUrl)
      ..writeByte(22)
      ..write(obj.address)
      ..writeByte(23)
      ..write(obj.city)
      ..writeByte(24)
      ..write(obj.province);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is HistoricPlaceAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}
